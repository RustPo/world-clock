import { TimeZone } from '@/entities/timezone';
import { Button } from '@/shared/ui/button';
import { FC } from 'react';

const TimezoneDelete: FC<{ tzId: string }> = ({ tzId }) => {
    return (
        <Button
            className="w-full"
            variant={'outline'}
            onClick={() => TimeZone.delete(tzId)}>
            Удалить
        </Button>
    );
};

export default TimezoneDelete;
