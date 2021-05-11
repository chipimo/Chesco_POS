const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const userhome = require("user-home");
const fs = require("fs-extra");
const Alert = require("electron-alert");

let alert = new Alert();

const uuidv4 = require("uuid/v4");

function CreateId() {
  return uuidv4();
}

export async function saveToCsvFile(list) {
  
  const file = `${userhome}/Documents/Chesco-Tec/Reports/${list.type}/doc.md`;

  fs.ensureFileSync(file);
  const pdfPathMain = `${userhome}/Documents/Chesco-Tec/Reports/${list.type}/${list.type}-Report-${CreateId()}.csv`;

  const csvWriter = createCsvWriter({
    path: pdfPathMain,
    header: list.header,
  });

  const data = list.data;

  let swalOptions = {
	title: "The CSV file was written successfully",
	text: "Written successfully!",
	type: "success",
	showCancelButton: false
};

  csvWriter
    .writeRecords(data)
    .then(() =>alert.fireWithFrame(swalOptions, "CSV file", null, false));
}
