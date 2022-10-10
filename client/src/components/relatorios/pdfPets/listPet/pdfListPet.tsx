import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

export const pdfListPet = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs

    const reportTitle:string[] = [];
    const reportList: string[] = [];
    const reportFooter: string[] = [];

    const reportConfigs: any = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],
        header: [reportTitle],
        content: [reportList],
        footer: [reportFooter]
    }

    pdfMake.createPdf(reportConfigs).open();
}