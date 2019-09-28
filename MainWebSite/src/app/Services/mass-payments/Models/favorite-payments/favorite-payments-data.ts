import { ProcessBatchDto } from '../../../shared/models/process-batch';
import { FavoritePaymentsDetailsForms } from './favorite-payments-details-forms';

export class FavoritePaymentsData extends ProcessBatchDto {
    speeadsheet: FavoritePaymentsDetailsForms =  new FavoritePaymentsDetailsForms();
}
