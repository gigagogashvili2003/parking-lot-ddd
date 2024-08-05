import { Catch, RpcExceptionFilter as IRpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcExceptionFilter implements IRpcExceptionFilter<RpcException> {
    catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
        const error = exception.getError();
        const response = {
            statusCode: error['status'] || 500,
            message: error['message'] || 'Internal server error',
        };
        return of(response);
    }
}
