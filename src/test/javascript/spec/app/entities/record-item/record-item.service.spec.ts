/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { RecordItemService } from 'app/entities/record-item/record-item.service';
import { IRecordItem, RecordItem } from 'app/shared/model/record-item.model';

describe('Service Tests', () => {
    describe('RecordItem Service', () => {
        let injector: TestBed;
        let service: RecordItemService;
        let httpMock: HttpTestingController;
        let elemDefault: IRecordItem;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(RecordItemService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new RecordItem(0, 0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 0, 'AAAAAAA');
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a RecordItem', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new RecordItem(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a RecordItem', async () => {
                const returnedFromService = Object.assign(
                    {
                        number: 1,
                        name: 'BBBBBB',
                        mnemonic: 'BBBBBB',
                        specialCase: 'BBBBBB',
                        unitType: 'BBBBBB',
                        unit: 'BBBBBB',
                        dataType: 'BBBBBB',
                        nullValue: 1,
                        description: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of RecordItem', async () => {
                const returnedFromService = Object.assign(
                    {
                        number: 1,
                        name: 'BBBBBB',
                        mnemonic: 'BBBBBB',
                        specialCase: 'BBBBBB',
                        unitType: 'BBBBBB',
                        unit: 'BBBBBB',
                        dataType: 'BBBBBB',
                        nullValue: 1,
                        description: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .query(expected)
                    .pipe(take(1), map(resp => resp.body))
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a RecordItem', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
