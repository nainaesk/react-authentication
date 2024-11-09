export function jsonify(data, config) {
    return new Response(JSON.stringify({ ...data }), { ...config });
}

export function timeFormatter(time) {
    if (time < 1000) {
        return `${time} milliseconds`;
    }

    if (time >= 1000 && time < 60000) {
        const seconds = Math.floor(time / 1000);
        const milliseconds = time % 1000;

        return `${seconds} seconds, ${milliseconds} milliseconds`;
    }

    if (time >= 60000 && time < 3600000) {
        const minutes = Math.floor(time / 60000);
        let remainingMilliseconds = time % 60000;

        const seconds = Math.floor(remainingMilliseconds / 1000);
        const milliseconds = remainingMilliseconds % 1000;

        return `${minutes} minutes, ${seconds} seconds, ${milliseconds} milliseconds`;
    }

    if (time >= 3600000) {
        const hours = Math.floor(time / 3600000);
        let remainingMilliseconds = time % 3600000;

        const minutes = Math.floor(remainingMilliseconds / 60000);
        remainingMilliseconds %= 60000;

        const seconds = Math.floor(remainingMilliseconds / 1000);
        const milliseconds = remainingMilliseconds % 1000;

        return `${hours} hours, ${minutes} minutes, ${seconds} seconds, ${milliseconds} milliseconds`;
    }
}
