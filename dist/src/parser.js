import { LiteralExpr, PrintStmt, VariableExpr } from './ast.js';
import { TokenKind } from './token.js';
export class Parser {
    tokens;
    currentPos;
    constructor(tokens) {
        this.tokens = tokens;
        this.currentPos = 0;
    }
    parse() {
        const stmts = [];
        while (!this.isAtEnd()) {
            stmts.push(this.parseStmt());
        }
        return stmts;
    }
    parseStmt() {
        if (this.match(TokenKind.Print)) {
            return this.parsePrintStmt();
        }
        throw this.error(this.peek(), 'Expression expected.');
    }
    parsePrintStmt() {
        this.consume(TokenKind.OpenParen, "Expect '(' after 'छाप'");
        const expr = this.parseExpression();
        this.consume(TokenKind.CloseParen, "Expect ')' after expression");
        return new PrintStmt(expr);
    }
    parseExpression() {
        return this.parsePrimary();
    }
    parsePrimary() {
        if (this.match(TokenKind.String, TokenKind.Number)) {
            return new LiteralExpr(this.previous().lexeme);
        }
        if (this.match(TokenKind.Identifier)) {
            return new VariableExpr(this.previous());
        }
        throw this.error(this.peek(), 'Expression expected.');
    }
    match(...kinds) {
        for (const kind of kinds) {
            if (this.check(kind)) {
                this.advance();
                return true;
            }
        }
        return false;
    }
    consume(kind, message) {
        if (this.check(kind))
            return this.advance();
        throw this.error(this.peek(), message);
    }
    check(kind) {
        if (this.isAtEnd())
            return false;
        return this.peek().kind === kind;
    }
    advance() {
        if (!this.isAtEnd())
            this.currentPos++;
        return this.previous();
    }
    peek() {
        return this.tokens[this.currentPos];
    }
    previous() {
        return this.tokens[this.currentPos - 1];
    }
    isAtEnd() {
        return this.peek().kind === TokenKind.Eof;
    }
    error(token, message) {
        return new Error(`> [line ${token.line}] Error: ${message}`);
    }
}
