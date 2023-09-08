import { useEffect, useState } from "react";

function CountDown(props) {
    const { handleFinish } = props;
    const [count, setCount] = useState(60); //60s
    const [time, setTime] = useState(1); //total time (phút)
    useEffect(() => {
        if (time === 0 && count === 0) {
            handleFinish();
            return () => {
                clearTimeout(countDown);
            };
        }
        const countDown = setTimeout(() => {
            setCount(count - 1);
            if (count - 1 < 0) {
                setTime(time - 1);
                setCount(59);
            }
        }, 1000);
    }, [count, time]);
    return (
        <div>
            <span>
                {time} : {count}
            </span>
        </div>
    );
}

export default CountDown;
