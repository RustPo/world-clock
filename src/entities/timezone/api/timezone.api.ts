import { TimeZoneEntity, TimeZoneServer } from '@/shared/api/model/timezone';
import { store } from '@/shared/lib/redux';
import { removeTimezone, setAvailableTimezones, setTimezone } from '@/shared/lib/redux/timezone/timezone.slice';
import cuid from 'cuid';

export class TimeZone {
    static async getList() {
        try {
            const response = await fetch('/timezones.json');
            if (!response.ok) throw new Error('Ошибка загрузки часовых поясов');

            const data = (await response.json()) as TimeZoneServer[];

            await new Promise((resolve) => setTimeout(resolve, 1500));

            const timezones: TimeZoneEntity[] = data.map(this.generateTimeZoneEntity);
            store.dispatch(setAvailableTimezones(timezones));
        } catch (error) {
            console.error('Ошибка при загрузке таймзон:', error);
        }
    }

    static delete(tzId: string) {
        store.dispatch(removeTimezone(tzId));
    }

    static add(tzId: string) {
        store.dispatch(setTimezone(tzId));
    }

    static generateTimeZoneEntity(tz: TimeZoneServer): TimeZoneEntity {
        return {
            city: tz.city,
            timezone: tz.timezone,
            id: cuid(),
        };
    }
}
