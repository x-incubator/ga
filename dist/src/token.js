export var TokenKind;
(function (TokenKind) {
    TokenKind["Eof"] = "Eof";
    TokenKind["Illegal"] = "Illegal";
    /* -- Punctuation/Delimiters -- */
    TokenKind["Comma"] = "Comma";
    TokenKind["Colon"] = "Colon";
    TokenKind["Period"] = "Period";
    TokenKind["Semicolon"] = "Semicolon";
    TokenKind["OpenParen"] = "OpenParen";
    TokenKind["CloseParen"] = "CloseParen";
    TokenKind["OpenCurly"] = "OpenCurly";
    TokenKind["CloseCurly"] = "CloseCurly";
    /* -- Operators -- */
    TokenKind["Plus"] = "Plus";
    TokenKind["Minus"] = "Minus";
    TokenKind["Star"] = "Star";
    TokenKind["Slash"] = "Slash";
    TokenKind["Mod"] = "Mod";
    TokenKind["Bang"] = "Bang";
    TokenKind["Equal"] = "Equal";
    /* -- Literals -- */
    TokenKind["Number"] = "Number";
    TokenKind["Character"] = "Character";
    TokenKind["String"] = "String";
    TokenKind["Identifier"] = "Identifier";
    /* -- Keywords -- */
    TokenKind["Let"] = "Let";
    TokenKind["Function"] = "Function";
    TokenKind["Print"] = "Print";
    TokenKind["Return"] = "Return";
    TokenKind["If"] = "If";
    TokenKind["Else"] = "Else";
    TokenKind["True"] = "True";
    TokenKind["False"] = "False";
})(TokenKind || (TokenKind = {}));
export const keywords = {
    मानौ: TokenKind.Let,
    कार्य: TokenKind.Function,
    छाप: TokenKind.Print,
    यदि: TokenKind.If,
    नभए: TokenKind.Else,
    फिर्ता: TokenKind.Return,
    सत्य: TokenKind.True,
    असत्य: TokenKind.False
};
export class Token {
    kind;
    lexeme;
    line;
    constructor(kind, lexeme, line) {
        this.kind = kind;
        this.lexeme = lexeme;
        this.line = line;
    }
}
