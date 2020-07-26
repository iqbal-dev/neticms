
export const getFileContentType = (fileName) => {
    if (fileName === undefined) {
        return;
    }
    let contentType = '';
    if (fileName.endsWith('.jpeg')) {
        contentType = 'image/jpeg';
    } else if (fileName.endsWith('.jpg')) {
        contentType = 'image/jpg';
    } else if (fileName.endsWith('.png')) {
        contentType = 'image/png';
    } else if (fileName.endsWith('.pdf')) {
        contentType = 'application/pdf';
    } else if (fileName.endsWith('.doc')) {
        contentType = 'application/doc';
    } else if (fileName.endsWith('.docx')) {
        contentType = 'application/docx';
    } else if (fileName.endsWith('.xls')) {
        contentType = 'application/xls';
    } else if (fileName.endsWith('.xlsx')) {
        contentType = 'application/xlsx';
    } else if (fileName.endsWith('.ppt')) {
        contentType = 'application/ppt';
    } else if (fileName.endsWith('.pptx')) {
        contentType = 'application/pptx';
    }
    return 'data:' + contentType + ';base64,';;
}