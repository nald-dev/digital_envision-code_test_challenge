interface PropsInterface {
    title: string;
    value?: string;
}

function InformationPoint({ title, value }: PropsInterface) {
    return (
        <div
            className = 'country-detail-information-point-container'
        >
            <div>
                {title}
            </div>

            <div>
                {value}
            </div>
        </div>
    )
}

export default InformationPoint
