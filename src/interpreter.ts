import type {
  Expr,
  ExprVisitor,
  LiteralExpr,
  PrintStmt,
  Stmt,
  StmtVisitor,
  VariableExpr,
  VarStmt
} from './ast.js';

export class Interpreter implements ExprVisitor<any>, StmtVisitor<void> {
  private environment: Map<string, any> = new Map();

  interpret(statements: Stmt[]): void {
    for (const statement of statements) {
      this.execute(statement);
    }
  }

  private execute(stmt: Stmt): void {
    stmt.accept(this);
  }

  /*
   * Process print statement
   */
  visitPrintStmt(stmt: PrintStmt): void {
    const value = this.evaluate(stmt.expression);
    console.log(value);
  }

  visitVarStmt(stmt: VarStmt): void {
    const value =
      stmt.initializer !== null ? this.evaluate(stmt.initializer) : null;
    this.environment.set(stmt.name.lexeme, value);
  }

  visitLiteralExpr(expr: LiteralExpr): any {
    if (typeof expr.value === 'string' && expr.value.startsWith('"')) {
      return expr.value.slice(1, -1);
    }

    return expr.value;
  }

  visitVariableExpr(expr: VariableExpr): any {
    const value = this.environment.get(expr.name.lexeme);
    if (value === undefined) {
      throw new Error(`Undefined variable '${expr.name.lexeme}'`);
    }
    return value;
  }

  /*
   * Evaluate an expression
   */
  private evaluate(expr: Expr): any {
    return expr.accept(this);
  }
}
