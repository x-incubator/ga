export class Interpreter {
    interpret(statements) {
        for (const statement of statements) {
            this.execute(statement);
        }
    }
    execute(stmt) {
        stmt.accept(this);
    }
    /*
     * Process print statement
     */
    visitPrintStmt(stmt) {
        const value = this.evaluate(stmt.expression);
        console.log(value);
    }
    visitVarStmt(stmt) {
        // TODO: yet to implement
    }
    visitLiteralExpr(expr) {
        if (typeof expr.value === 'string' && expr.value.startsWith('"')) {
            return expr.value.slice(1, -1);
        }
        return expr.value;
    }
    visitVariableExpr(expr) {
        // TODO: yet to implement
    }
    /*
     * Evaluate an expression
     */
    evaluate(expr) {
        return expr.accept(this);
    }
}
