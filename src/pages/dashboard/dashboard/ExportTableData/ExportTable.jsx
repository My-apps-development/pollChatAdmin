import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const splitData = (data) => {

    return [...data]?.reverse()?.map(item => {
        return {
            userName: `${item?.userId?.name}`,
            action: item?.action,
            like: item?.likeCount,
            dislike: item?.dislikeCount,
            Comment: item?.commentCount,
            share: item?.shareCount,
            download: item?.downloadCount,
            // percentage: item?.assignment?.percentage !== undefined ? parseFloat(item?.assignment?.percentage).toFixed(2) : undefined,
        };
    });
};

const ExportActionRecord = (data, filename) => {

    const splittedData = splitData(data)
    const WorkSheet = XLSX.utils.json_to_sheet(splittedData)
    const WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(WorkBook, WorkSheet, "Sheet 1")
    const excelBuffer = XLSX.write(WorkBook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    saveAs(blob, `${filename}.xlsx`);
}

export default ExportActionRecord