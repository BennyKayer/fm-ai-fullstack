const createURL = (path: string) => {
    return window.location.origin + path;
}

export const createNewEntry = async () => {
    const url = createURL('/api/journal')
    const init: RequestInit = {
        method: "POST",
    }
    const request = new Request(url, init)
    const res = await fetch(request)

    if (res.ok) {
        const { data } = await res.json();
        return data;
    }
}

export const updateEntry = async (id: string, content: string) => {
    const url = createURL(`/api/journal/${id}`)
    const init: RequestInit = {
        method: "PATCH",
        body: JSON.stringify({ content })
    }
    const request = new Request(url, init)
    const res = await fetch(request)

    if (res.ok){
        const { data } = await res.json();
        return data;
    }
}