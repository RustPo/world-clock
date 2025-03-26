import { useAppSelector } from '@/shared/lib/redux';
import { ClockWidget } from '@/widgets/clock';
import { TimezoneSelectorWidget } from '@/widgets/timezones';

function App() {
    const selectedTimezones = useAppSelector((state) => state.timezones.selectedTimezones);
    return (
        <div className="max-w-[1100px] text-center mx-auto flex justify-center p-5 flex-col items-center">
            <TimezoneSelectorWidget />

            {selectedTimezones.length > 0 && <h1 className="font-bold text-5xl">Выбранные часовые пояса:</h1>}

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 lg:gap-20 w-full">
                {selectedTimezones.map((timezone) => (
                    <ClockWidget
                        {...timezone}
                        key={timezone.id}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
