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

/**
 * @description Denotes an sfdx-project.json file was either not found,
 *              or that the file was found but did not contain a packageAliases
 *              property (e.g. it's not for an Unlocked Package).
 */
export class PackageNotFoundError extends Error {
    constructor(message = "Package not found") {
        super(message);
        this.name = "PackageNotFoundError";
    }
}
