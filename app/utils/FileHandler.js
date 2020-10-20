
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

export const getFileExtention = (fileName) => {
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
    return contentType;
}

export const getFileTypeOnly = (fileName) => {

    if (fileName === undefined) { return; }
    let fileType = '';

    if (fileName.endsWith('.jpeg') || fileName.endsWith('.jpg') || fileName.endsWith('.png')) { fileType = 'image'; }
    else if (fileName.endsWith('.pdf')) { fileType = 'pdf'; }
    else if (fileName.endsWith('.doc')) { fileType = 'doc'; }
    else if (fileName.endsWith('.docx')) { fileType = 'docx'; }
    else if (fileName.endsWith('.xls')) { fileType = 'xls'; }
    else if (fileName.endsWith('.xlsx')) { fileType = 'xlsx'; }
    else if (fileName.endsWith('.ppt')) { fileType = 'ppt'; }
    else if (fileName.endsWith('.pptx')) { fileType = 'pptx'; }

    return fileType;
}

export const getMaxFileSizeIsValid = (fileSize, maxFileSize) => {

    // file must be in byte
    if (fileSize < maxFileSize) {
        return true;
    } else { return false }

}