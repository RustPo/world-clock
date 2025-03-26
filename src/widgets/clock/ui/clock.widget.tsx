import { Clock } from '@/entities/clock';
import { TimezoneDelete } from '@/features/timezone';
import { TimeZoneEntity } from '@/shared/api/model/timezone';

import { Card, CardTitle, CardContent, CardFooter } from '@/shared/ui/card';
import { FC } from 'react';

const ClockWidget: FC<TimeZoneEntity> = (tz) => {
    return (
        <Card className="text-center">
            <CardTitle>
                <p>Часы {tz.city}</p>
            </CardTitle>
            <CardContent>
                <Clock id={tz.id} />
            </CardContent>
            <CardFooter>
                <TimezoneDelete tzId={tz.id} />
            </CardFooter>
        </Card>
    );
};

export default ClockWidget;
