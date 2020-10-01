
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import moment from 'moment';

export const getDownloadTablePDF = (headerString, tableColumnList, tableBodyList) => {
    const doc = new jsPDF("p", "mm", "a4");

    var date_portrait = "                                                                                                                                 Date: ";
    var pdfday = moment().format('Do MMMM,YYYY');

    // title & header Content
    doc.setProperties(headerString);
    doc.setFontSize(15);
    doc.setTextColor(0);
    doc.setDrawColor(100, 100, 100);
    doc.setFont("helvetica");
    doc.setFontSize(12);
    doc.text(headerString, 15, 20);

    // Footer Contents
    var pageContent = function (data) {
        // console.log("data", data);
        var str = "";
        if (typeof doc.putTotalPages === "function") {
            str = "Page " + data.pageCount + " " + date_portrait + pdfday;    //" of " + totalPagesExp +
        }
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(str, data.settings.margin.right, doc.internal.pageSize.getHeight() - 10);
        // doc.text(btmLine_portrait, data.settings.margin.right, doc.internal.pageSize.getHeight() - 14.5);
    };

    doc.autoTable(tableColumnList, tableBodyList, {
        startY: 23,
        theme: "grid",
        pageBreak: "auto",
        headStyles: {
            halign: "center",
            fillColor: [105, 124, 171],
            textColor: [255, 255, 255],
            overflow: "linebreak",
            fontSize: 8,
            lineWidth: .3,
            lineColor: [105, 124, 150]
        },
        styles: {
            halign: "left",
            overflow: "linebreak",
            fontSize: 8,
            lineColor: [220, 220, 220],
            textColor: [60, 60, 60],
            fillStyle: "F"
        },
        columnStyles: {
            halign: "right",
            fontSize: 8,
            fontStyle: "bold",
            overflow: "linebreak"
        },
        didParseCell: function (data) {
            console.log("data", data);
            // if (typeof data.cell.raw == "number") { data.cell.text = formatToCurrency(data.cell.raw); }
            if (data.section === 'body' && data.column.index === 0) {
                data.cell.text = ""
                data.cell.styles.fillColor = [240, 240, 240];
                data.cell.styles.minCellHeight = 12;
                data.cell.styles.cellWidth = 12;
            }
        },

        didDrawPage: pageContent,
        didDrawCell: (data) => {
            if (data.section === 'body' && data.column.index === 0) {
                var base64Img = 'data:image/*;base64,' + data.cell.raw
                doc.addImage(base64Img, 'JPEG', data.cell.x + 1, data.cell.y + 1, 10, 10)
            }
        },

        margin: { bottom: 15 }
    });

    doc.save(moment().format('YYYY-MM-DD ') + headerString + ".pdf");
}