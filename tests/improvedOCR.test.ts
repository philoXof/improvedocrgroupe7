import { CodeArrayToString } from "../class/CodeArrayToString";
import fs from "fs";
import { FileWriter } from "../class/FileWriter";
import { OutputFilesPath } from "../enum/OutputFilesPath";
import { FileReader } from "../class/FileReader";
import { Checksum } from "../class/Checksum";
import { DecodeFile } from "../class/DecodeFile";

enum path {
    file1 ="files/file1",
    file2 ="files/file2",
    file3 ="files/file3",
    file4 ="files/file4",
    file5 ="files/file5",
    file6 ="files/file6",
    file7 ="files/file7",
    file8 ="files/file8",
}

describe('all tests',()=>{

    describe('decoding test, user story 1 & 3', ()=>{

        describe('decoding test User story 1', ()=>{
            test('file 1 should be "123456789"',()=>{
                expect(DecodeFile.getCode(path.file1)).toBe("123456789");
            });
            test('file 2 should be "111999888"',()=>{
                expect(DecodeFile.getCode(path.file2)).toBe("111999888");
            });
            test('file 3 should be "912588934"',()=>{
                expect(DecodeFile.getCode(path.file3)).toBe("912588934");
            });
            test('file 4 should be "111111111"',()=>{
                expect(DecodeFile.getCode(path.file4)).toBe("111111111");
            });
            test('file 5 should be "921584964"',()=>{
                expect(DecodeFile.getCode(path.file5)).toBe("921584964");
            });
            test('file 6 should be "418900666"',()=>{
                expect(DecodeFile.getCode(path.file6)).toBe("418900666");
            });
        });

        describe('decoding test user story 3', ()=>{
            test('file 7 should be "12?13678?"', ()=>{
                expect(DecodeFile.getCode(path.file7)).toBe('?2?13678?');
            });
            test('file 8 should be "312?8?93?"', ()=>{
                expect(DecodeFile.getCode(path.file8)).toBe('312?8?93?');
            });
        });
    });

    describe('TabToString tests', ()=>{

        test('should be 0', ()=>{
            expect(CodeArrayToString.convert([
                " _ ",
                "| |",
                "|_|",
            ])).toBe("0")
        });
        test('should be 1', ()=>{
            expect(CodeArrayToString.convert([
                "   ",
                "  |",
                "  |",
            ])).toBe("1")
        });
        test('should be 2', ()=>{
            expect(CodeArrayToString.convert([
                " _ ",
                " _|",
                "|_ ",
            ])).toBe("2")
        });
        test('should be 3', ()=>{
            expect(CodeArrayToString.convert([
                " _ ",
                " _|",
                " _|"
            ])).toBe("3")
        });
        test('should be 4', ()=>{
            expect(CodeArrayToString.convert([
                "   ",
                "|_|",
                "  |"
            ])).toBe("4")
        });
        test('should be 5', ()=>{
            expect(CodeArrayToString.convert([
                " _ ",
                "|_ ",
                " _|"
            ])).toBe("5")
        });
        test('should be 6', ()=>{
            expect(CodeArrayToString.convert([
                " _ ",
                "|_ ",
                "|_|"
            ])).toBe("6")
        });
        test('should be 7', ()=>{
            expect(CodeArrayToString.convert([
                " _ ",
                "  |",
                "  |"
            ])).toBe("7")
        });
        test('should be 8', ()=>{
            expect(CodeArrayToString.convert([
                " _ ",
                "|_|",
                "|_|"
            ])).toBe("8")
        });
        test('should be 9', ()=>{
            expect(CodeArrayToString.convert([
                " _ ",
                "|_|",
                " _|"
            ])).toBe("9")
        });
    });

    describe('files content tests', ()=>{
        test('file1 should be the same', ()=>{
            expect(FileReader.getContent(path.file1)).toBe(fs.readFileSync(path.file1, {encoding:'utf-8'}));
        });
        test('file3 should be the same', ()=>{
            expect(FileReader.getContent(path.file3)).toBe(fs.readFileSync(path.file3, {encoding:'utf-8'}));
        });
        test('file6 should be the same', ()=>{
            expect(FileReader.getContent(path.file6)).toBe(fs.readFileSync(path.file6, {encoding:'utf-8'}));
        });
    });

    describe('createAndInitTab tests', ()=> {
        const tab: string [] = DecodeFile.fileToTab(path.file1);
        test('length should be 3', () => {
            expect(tab.length).toBe(3);
        });
        test('length should be 27', () => {
            expect(tab[0].length).toBe(27);
        });
        test('length should be 27', () => {
            expect(tab[1].length).toBe(27);
        });
        test('length should be 27', () => {
            expect(tab[2].length).toBe(27);
        });
    });

    describe('CheckSum validation, User Story 2', ()=> {
        test('should be false', () => {
            expect(Checksum.isValidChecksum('123')).toBe(false);
        });
        test('should be false', () => {
            expect(Checksum.isValidChecksum('0123456789')).toBe(false);
        });
        test('should be true', () => {
            expect(Checksum.isValidChecksum('123456789')).toBe(true);
        });
        test('should be true', () => {
            expect(Checksum.isValidChecksum('457508000')).toBe(true);
        });
        test('should be false', () => {
            expect(Checksum.isValidChecksum('664371495')).toBe(false);
        });
        test('unreadable, should be false', () => {
            expect(Checksum.isValidChecksum('?2?13678?')).toBe(false);
        });
        test('unreadable, should be false', () => {
            expect(Checksum.isValidChecksum('312?8?93?')).toBe(false);
        });
    });

    describe('add code suffixes before write on file', ()=> {

        describe('user story 3', () => {
            test('should be "123 + ERR"', () => {
                expect(Checksum.addSuffix('123')).toBe('123 ERR');
            });
            test('should be "0123456789 + ERR"', () => {
                expect(Checksum.addSuffix('0123456789')).toBe('0123456789 ERR');
            });
            test('should be 457508000', () => {
                expect(Checksum.addSuffix('457508000')).toBe('457508000');
            });
            test('should be "664371495 "664371495 ERR"', () => {
                expect(Checksum.addSuffix('664371495')).toBe('664371495 ERR');
            });
        });

        describe('user story 4', () => {
            test('should be "?2?13678? ILL"', () => {
                expect(Checksum.addSuffix('?2?13678?')).toBe('?2?13678? ILL');
            });
            test('should be "312?8?93? ILL"', () => {
                expect(Checksum.addSuffix('312?8?93?')).toBe('312?8?93? ILL');
            });
        });
    });

    describe('output file, User Story 5',()=>{

        describe('one file', ()=> {
            test('code "123456789" should be write in "' + OutputFilesPath.oneOutput + '"', () => {
                expect(FileWriter.whereWrite('123456789', true)).toBe(OutputFilesPath.oneOutput);
            });
            test('code "111999888 ERR" should be write in "' + OutputFilesPath.oneOutput + '"', () => {
                expect(FileWriter.whereWrite('111999888 ERR', true)).toBe(OutputFilesPath.oneOutput);
            });
            test('code "418900666 ERR" should be write in "' + OutputFilesPath.oneOutput + '"', () => {
                expect(FileWriter.whereWrite('418900666 ERR', true)).toBe(OutputFilesPath.oneOutput);
            });
            test('code "?2?13678? ILL" should be write in "' + OutputFilesPath.oneOutput + '"', () => {
                expect(FileWriter.whereWrite('?2?13678? ILL', true)).toBe(OutputFilesPath.oneOutput);
            });
        });

        describe('several file', ()=>{
            test('code "111111111 ERR" should be write in "' + OutputFilesPath.wrongChecksum + '"', ()=>{
                expect(FileWriter.whereWrite('111111111 ERR', false)).toBe(OutputFilesPath.wrongChecksum);
            });
            test('code "921584964 ERR" should be write in "' + OutputFilesPath.wrongChecksum + '"', ()=>{
                expect(FileWriter.whereWrite('921584964 ERR', false)).toBe(OutputFilesPath.wrongChecksum);
            });
            test('code "912588934" should be write in "' + OutputFilesPath.valid + '"', ()=>{
                expect(FileWriter.whereWrite('912588934', false)).toBe(OutputFilesPath.valid);
            });
            test('code "312?8?93? ILL" should be write in "' + OutputFilesPath.unreadable + '"', ()=>{
                expect(FileWriter.whereWrite('312?8?93? ILL', false)).toBe(OutputFilesPath.unreadable);
            });
        });
    });
});
