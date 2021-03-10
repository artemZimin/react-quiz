// export const dateToLocalFormat = date => new Date(date).toLocaleString()

export const dateToLocalFormat = date => {

    const formatter = new Intl.DateTimeFormat('ru', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    })

    return formatter.format(new Date(date))
}
