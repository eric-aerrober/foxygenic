export class InvalidRepositoryUrlError extends Error {
    constructor(message = "Invalid repository URL") {
        super(message);
        this.name = "InvalidRepositoryUrlError";
    }
}

export class NotSalesforceProjectError extends Error {
    constructor(message = "This repository is not a Salesforce project") {
        super(message);
        this.name = "NotSalesforceProjectError";
    }
}

export class UnableToValidateSalesforceProjectError extends Error {
    constructor(message = "Unable to validate this is a Salesforce project") {
        super(message);
        this.name = "UnableToValidateSalesforceProjectError";
    }
}

export class UnableToRegisterRepositoryError extends Error {
    constructor(message = "Unable to register repository") {
        super(message);
        this.name = "UnableToRegisterRepositoryError";
    }
}
