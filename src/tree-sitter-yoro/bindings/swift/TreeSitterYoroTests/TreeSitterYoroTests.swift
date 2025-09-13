import XCTest
import SwiftTreeSitter
import TreeSitterYoro

final class TreeSitterYoroTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_yoro())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Yoro grammar")
    }
}
