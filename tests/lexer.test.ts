import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import { Lexer } from '../src/lexer.js';
import { Token, TokenKind } from '../src/token.js';

describe('Lexer', () => {
  test('scan punctuations & delimeters', () => {
    const source: string = `,:.;(){}`;

    const lexer: Lexer = new Lexer(source.trim());
    const actual = lexer.readTokens();

    const expected: Token[] = [
      new Token(TokenKind.Comma, ',', 1),
      new Token(TokenKind.Colon, ':', 1),
      new Token(TokenKind.Period, '.', 1),
      new Token(TokenKind.Semicolon, ';', 1),
      new Token(TokenKind.OpenParen, '(', 1),
      new Token(TokenKind.CloseParen, ')', 1),
      new Token(TokenKind.OpenCurly, '{', 1),
      new Token(TokenKind.CloseCurly, '}', 1),
      new Token(TokenKind.Eof, '', 1)
    ];

    assert.equal(actual.length, expected.length);
    assert.deepEqual(actual, expected);
  });

  test('scan operators', () => {
    const source: string = `+-*/%!=`;

    const lexer: Lexer = new Lexer(source.trim());
    const actual = lexer.readTokens();

    const expected: Token[] = [
      new Token(TokenKind.Plus, '+', 1),
      new Token(TokenKind.Minus, '-', 1),
      new Token(TokenKind.Star, '*', 1),
      new Token(TokenKind.Slash, '/', 1),
      new Token(TokenKind.Mod, '%', 1),
      new Token(TokenKind.Bang, '!', 1),
      new Token(TokenKind.Equal, '=', 1),
      new Token(TokenKind.Eof, '', 1)
    ];

    assert.equal(actual.length, expected.length);
    assert.deepEqual(actual, expected);
  });

  test('scan literals & keywords', () => {
    const source: string = `कार्य काम() {
    सन्देश = "सोच्छौ के मेरो बारे?"
    छाप(सन्देश)
    छाप(१२३)
    }
    काम() `;

    const lexer: Lexer = new Lexer(source.trim());
    const actual = lexer.readTokens();

    const expected: Token[] = [
      new Token(TokenKind.Function, 'कार्य', 1),
      new Token(TokenKind.Identifier, 'काम', 1),
      new Token(TokenKind.OpenParen, '(', 1),
      new Token(TokenKind.CloseParen, ')', 1),
      new Token(TokenKind.OpenCurly, '{', 1),
      new Token(TokenKind.Identifier, 'सन्देश', 2),
      new Token(TokenKind.Equal, '=', 2),
      new Token(TokenKind.String, '"सोच्छौ के मेरो बारे?"', 2),
      new Token(TokenKind.Print, 'छाप', 3),
      new Token(TokenKind.OpenParen, '(', 3),
      new Token(TokenKind.Identifier, 'सन्देश', 3),
      new Token(TokenKind.CloseParen, ')', 3),
      new Token(TokenKind.Print, 'छाप', 4),
      new Token(TokenKind.OpenParen, '(', 4),
      new Token(TokenKind.Number, '१२३', 4),
      new Token(TokenKind.CloseParen, ')', 4),
      new Token(TokenKind.CloseCurly, '}', 5),
      new Token(TokenKind.Identifier, 'काम', 6),
      new Token(TokenKind.OpenParen, '(', 6),
      new Token(TokenKind.CloseParen, ')', 6),
      new Token(TokenKind.Eof, '', 6)
    ];

    assert.equal(actual.length, expected.length);
    assert.deepEqual(actual, expected);
  });

  test('reject non-devanagari characters outside string literals', () => {
    const source = `मानौ x = ५`;

    const lexer = new Lexer(source);

    assert.throws(() => {
      lexer.readTokens();
    }, /Invalid character 'x' at line 1/);
  });

  test('allow non-devanagari characters inside string literals', () => {
    const source = `मानौ सन्देश = "Hello World. 123!"`;

    const lexer = new Lexer(source);
    const actual = lexer.readTokens();

    const expected = [
      new Token(TokenKind.Let, 'मानौ', 1),
      new Token(TokenKind.Identifier, 'सन्देश', 1),
      new Token(TokenKind.Equal, '=', 1),
      new Token(TokenKind.String, '"Hello 123!"', 1),
      new Token(TokenKind.Eof, '', 1)
    ];

    assert.equal(actual.length, expected.length);
    assert.deepEqual(actual, expected);
  });
});
