export const ORDER_SIZES = [
    'SECONDS AGO', 'MINUTES AGO', 'HOURS AGO', 'DAYS AGO', 'MONTHS AGO', 'YEARS AGO',
    ' KB', ' MB', ' GB', ' TB'
]

export default function(key)
{
    return (a, b) => {
        const aVal = getOrderPosition(a[key])
        const bVal = getOrderPosition(b[key])

        // This uses the getOrderPosition function to find out
        // if there are other metrics than name (e.g., days/months/
        // years, or MB/GB/TB), compares them first, then falls back
        // to normal ordering if they match or neither have the
        // qualitative metrics.
        //
        // So 7 minutes will always be less than 1 month. But when we
        // compares 1 month to 2 months, we then fall back to alpha
        // sorting so that 2 months > 1 month.
        if(aVal > -1 && bVal > -1 && aVal !== bVal)
        {
            return aVal - bVal
        }

        const aAbs = a[key].toUpperCase()
        const bAbs = b[key].toUpperCase()
        if (aAbs < bAbs) {
            return -1
        }
        if (aAbs > bAbs) {
            return 1
        }
        return 0
    }
}

function getOrderPosition(key)
{
    const keyCap = key.toUpperCase()
    for(let i = 0; i < ORDER_SIZES.length; i++) {
        if(keyCap.indexOf(ORDER_SIZES[i]) > -1) return i
    }
    return -1
}
