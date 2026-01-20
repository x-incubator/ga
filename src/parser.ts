import {
  LiteralExpr,
  PrintStmt,
  VariableExpr,
  type Expr,
  type Stmt
} from './ast.js';
import { TokenKind, type Token } from './token.js';

export class Parser {
  private tokens: Token[];
  private currentPos: number;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.currentPos = 0;
  }

  parse(): Stmt[] {
    const stmts: Stmt[] = [];
    while (!this.isAtEnd()) {
      stmts.push(this.parseStmt());
    }

    return stmts;
  }

  private parseStmt(): Stmt {
    if (this.match(TokenKind.Print)) {
      return this.parsePrintStmt();
    }

    throw this.error(this.peek(), 'Expression expected.');
  }

  private parsePrintStmt(): Stmt {
    this.consume(TokenKind.OpenParen, "Expect '(' after 'छाप'");
    const expr = this.parseExpression();
    this.consume(TokenKind.CloseParen, "Expect ')' after expression");
    return new PrintStmt(expr);
  }

  private parseExpression(): Expr {
    return this.parsePrimary();
  }

  private parsePrimary(): Expr {
    if (this.match(TokenKind.String, TokenKind.Number)) {
      return new LiteralExpr(this.previous().lexeme);
    }

    if (this.match(TokenKind.Identifier)) {
      return new VariableExpr(this.previous());
    }

    throw this.error(this.peek(), 'Expression expected.');
  }

  private match(...kinds: TokenKind[]): boolean {
    for (const kind of kinds) {
      if (this.check(kind)) {
        this.advance();
        return true;
      }
    }
    return false;
  }

  private consume(kind: TokenKind, message: string): Token {
    if (this.check(kind)) return this.advance();
    throw this.error(this.peek(), message);
  }

  private check(kind: TokenKind): boolean {
    if (this.isAtEnd()) return false;
    return this.peek().kind === kind;
  }

  private advance(): Token {
    if (!this.isAtEnd()) this.currentPos++;
    return this.previous();
  }

  private peek(): Token {
    return this.tokens[this.currentPos]!;
  }

  private previous(): Token {
    return this.tokens[this.currentPos - 1]!;
  }

  private isAtEnd(): boolean {
    return this.peek().kind === TokenKind.Eof;
  }

  private error(token: Token, message: string): Error {
    return new Error(`> [line ${token.line}] Error: ${message}`);
  }
}
