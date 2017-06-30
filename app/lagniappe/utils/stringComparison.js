export default function(a, b)
{
    const aV = (a+'').toUpperCase().trim()
    const bV = (b+'').toUpperCase().trim()
    if(aV < bV) return -1
    if(aV > bV) return 1
    return 0
}
