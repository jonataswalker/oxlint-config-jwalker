type Counter = {
    count: number
    increment(): void
}

declare const counter: Counter
declare const words: string[]
declare const label: string
declare const settings: { name: string }
declare function run(callback: () => void): void

export async function withoutAwait(): Promise<number> {
    return 1
}

export const awaited = await 5

export function nonAsyncPromise(): Promise<number> {
    return Promise.resolve(1)
}

export async function returnInTry(): Promise<number> {
    try {
        return withoutAwait()
    } catch {
        return 0
    }
}

withoutAwait()

run(async () => {
    await withoutAwait()
})

for (const index in words) {
    console.log(index)
}

setTimeout('console.log(1)', 10)

export const printed = `${settings}`
export const voided = console.log('done')
export const asserted = label as string
export const hasA = words.indexOf('a') !== -1
export const startsWithA = label.indexOf('a') === 0
export const sorted = [3, 1, 2].sort()
export const unbound = counter.increment
export const viaBracket = settings['name']

throw 'failure'
