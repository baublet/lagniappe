export default function parseCliTable(output)
{
    const lineMatcher = /(\s{23,}|\S+(?: \S+)*)/g
    const lines = output.split("\n")
    const rows = []
    let headings = []
    for(let i = 0; i < lines.length; i++) {
        if (i == 0) {
            headings = lines[i].match(lineMatcher)
        } else {
            const columns = lines[i].match(lineMatcher)
            if(!columns || !columns.length) continue;
            const row = {}
            headings.forEach((heading, i) => row[heading] = columns[i])
            rows.push(row)
        }
    }
    return rows
}
