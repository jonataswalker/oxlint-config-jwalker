export async function typeAware(input: string): Promise<string> {
    const upper = input.toUpperCase()

    return upper
}

export function taste(flag: boolean) {
    const label = 'value: ' + String(flag)

    if (flag == true) {
        return label
    }

    return label
}
