export class VariableExpr {
    name;
    constructor(name) {
        this.name = name;
    }
    accept(visitor) {
        return visitor.visitVariableExpr(this);
    }
}
export class LiteralExpr {
    value;
    constructor(value) {
        this.value = value;
    }
    accept(visitor) {
        return visitor.visitLiteralExpr(this);
    }
}
export class PrintStmt {
    expression;
    constructor(expression) {
        this.expression = expression;
    }
    accept(visitor) {
        return visitor.visitPrintStmt(this);
    }
}
export class VarStmt {
    name;
    initializer;
    constructor(name, initializer) {
        this.name = name;
        this.initializer = initializer;
    }
    accept(visitor) {
        return visitor.visitVarStmt(this);
    }
}
