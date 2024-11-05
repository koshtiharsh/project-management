
type Props = {
    name: string,
    buttonComponent?: any;
    isSmallText?: boolean;

}



export default function Header({ name, buttonComponent, isSmallText = false }: Props) {
    return (
        <div className="mb-5 w-full flex items-center justify-between">
            <h1 className={`${isSmallText ? 'text-large' : 'text-2xl'} font-semibold dark:text-white`}>
                {name}
            </h1>
            {buttonComponent}
        </div>
    )
};

