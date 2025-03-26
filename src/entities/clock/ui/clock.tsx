import { useAppSelector } from '@/shared/lib/redux';
import { Skeleton } from '@/shared/ui/skeleton';
import React, { useEffect, useState } from 'react';
import { getClockHandRotation, getInlineTime, numberPositions } from '../utils';

interface ClockProps {
    id: string;
}

const ClockSkeleton = () => {
    return (
        <div className="flex justify-center relative flex-col gap-3 items-center">
            <Skeleton className="h-[200px] w-[200px] rounded-full" />
            <Skeleton className="h-[24px] w-[80px]" />
        </div>
    );
};

const Clock: React.FC<ClockProps> = ({ id }) => {
    const selectedTimezone = useAppSelector((state) => state.timezones.selectedTimezones).find((tz) => tz.id === id);

    if (!selectedTimezone) throw new Error('timezone not found');

    const [time, setTime] = useState<Date | undefined>();

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date(new Date().toLocaleString('en-US', { timeZone: selectedTimezone.timezone })));
        }, 1000);

        return () => clearInterval(interval);
    }, [selectedTimezone]);

    if (!time) return <ClockSkeleton />;

    const second = time.getSeconds();
    const minute = time.getMinutes();
    const hour = time.getHours();

    const secondRotation = getClockHandRotation(second, 60);
    const minuteRotation = getClockHandRotation(minute, 60);
    const hourRotation = getClockHandRotation(hour % 12, 12) + (minute / 60) * 30;

    return (
        <div className="flex justify-center relative flex-col gap-3 items-center">
            <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg">
                <circle
                    cx="100"
                    cy="100"
                    r="98"
                    stroke="black"
                    strokeWidth="2"
                    fill="white"
                />

                <line
                    x1="100"
                    y1="100"
                    x2="100"
                    y2="60"
                    stroke="black"
                    strokeWidth="4"
                    transform={`rotate(${hourRotation} 100 100)`}
                />

                <line
                    x1="100"
                    y1="100"
                    x2="100"
                    y2="20" // Длина 40 пикселей
                    stroke="black"
                    strokeWidth="2"
                    transform={`rotate(${minuteRotation} 100 100)`}
                />

                <line
                    x1="100"
                    y1="100"
                    x2="100"
                    y2="20"
                    stroke="red"
                    strokeWidth="1"
                    transform={`rotate(${secondRotation} 100 100)`}
                />

                {numberPositions.map((pos) => {
                    const x = 100 + 75 * Math.cos((pos.angle - 90) * (Math.PI / 180));
                    const y = 100 + 75 * Math.sin((pos.angle - 90) * (Math.PI / 180));

                    return (
                        <text
                            key={pos.number}
                            x={x}
                            y={y}
                            textAnchor="middle"
                            alignmentBaseline="middle"
                            fontSize="14"
                            fill="black">
                            {pos.number}
                        </text>
                    );
                })}
            </svg>
            <p>{getInlineTime(hour, minute, second)}</p>
        </div>
    );
};

export default Clock;
