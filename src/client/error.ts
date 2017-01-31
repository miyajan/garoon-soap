export interface GaroonErrorDetail {
    code: string,
    diagnosis: string,
    cause: string,
    counterMeasure: string
}

export class GaroonError extends Error {
    public detail: GaroonErrorDetail;

    constructor(detail: GaroonErrorDetail, message?: string) {
        super(message);
        this.detail = detail;
    }
}
