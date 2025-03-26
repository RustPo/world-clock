import { TimeZone } from '@/entities/timezone';
import { useAppSelector } from '@/shared/lib/redux';
import {
    SelectItem,
    Select,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/shared/ui/select';
import { useEffect } from 'react';

const TimezoneSelectorWidget = () => {
    const selectedTimezones = useAppSelector((state) => state.timezones.selectedTimezones);
    const availableTimezones = useAppSelector((state) => state.timezones.timezones);

    useEffect(() => {
        TimeZone.getList();
    }, []);

    if (!availableTimezones.length)
        return (
            <div className="h-[500px] w-full flex justify-center items-center">
                <h1>Загрузка...</h1>
            </div>
        );

    return (
        <div className="mx-auto flex justify-center p-5">
            <div className="text-center flex flex-col gap-20">
                {selectedTimezones.length !== availableTimezones.length && (
                    <div className="flex flex-col gap-3">
                        <h2 className="text-3xl">Выберите часовой пояс</h2>

                        <Select onValueChange={TimeZone.add}>
                            <SelectTrigger className="w-[100%]">
                                <SelectValue placeholder="Выберите город">Выберите город</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Город</SelectLabel>
                                    {availableTimezones.map(
                                        (timezone) =>
                                            !selectedTimezones.includes(timezone) && (
                                                <SelectItem
                                                    key={timezone.id}
                                                    value={timezone.id}>
                                                    {timezone.city}
                                                </SelectItem>
                                            )
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TimezoneSelectorWidget;
