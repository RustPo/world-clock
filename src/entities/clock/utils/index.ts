// Позиции цифр по кругу
export const numberPositions = [
    { number: 1, angle: 30 },
    { number: 2, angle: 60 },
    { number: 3, angle: 90 },
    { number: 4, angle: 120 },
    { number: 5, angle: 150 },
    { number: 6, angle: 180 },
    { number: 7, angle: 210 },
    { number: 8, angle: 240 },
    { number: 9, angle: 270 },
    { number: 10, angle: 300 },
    { number: 11, angle: 330 },
    { number: 12, angle: 0 },
];

function addZero(value: number) {
    return value < 10 ? `0${value}` : `${value}`;
}

export function getInlineTime(hour: number, minute: number, second: number) {
    return `${addZero(hour)}:${addZero(minute)}:${addZero(second)}`;
}

export const getClockHandRotation = (unit: number, maxUnit: number) => {
    return (unit / maxUnit) * 360;
};
