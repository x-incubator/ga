export class Interpreter {
    environment = new Map();
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
        const value = stmt.initializer !== null ? this.evaluate(stmt.initializer) : null;
        this.environment.set(stmt.name.lexeme, value);
    }
    visitLiteralExpr(expr) {
        if (typeof expr.value === 'string' && expr.value.startsWith('"')) {
            return expr.value.slice(1, -1);
        }
        return expr.value;
    }
    visitVariableExpr(expr) {
        const value = this.environment.get(expr.name.lexeme);
        if (value === undefined) {
            throw new Error(`Undefined variable '${expr.name.lexeme}'`);
        }
        return value;
    }
    /*
     * Evaluate an expression
     */
    evaluate(expr) {
        return expr.accept(this);
    }
}
