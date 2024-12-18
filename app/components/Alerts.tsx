export function AlertSuccess({ title, message }: { title: string; message: string }) {
    return (
        <div className="flex items-start w-full gap-4 px-4 py-3 text-sm border rounded border-emerald-100 bg-emerald-50 text-emerald-500" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" role="graphics-symbol" aria-labelledby="title-01 desc-01">
                <title id="title-01">{title}</title>
                <desc id="desc-01">A more detailed description of the icon</desc>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>{message}</p>
        </div>
    );
}

export function AlertWarning({ title, message }: { title: string; message: string }) {
    return (
        <div className="flex items-start w-full gap-4 px-4 py-3 text-sm border rounded border-amber-100 bg-amber-50 text-amber-500" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" role="graphics-symbol" aria-labelledby="title-02 desc-02">
                <title id="title-02">{title}</title>
                <desc>A more detailed description of the icon</desc>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p>{message}</p>
        </div>
    );
}