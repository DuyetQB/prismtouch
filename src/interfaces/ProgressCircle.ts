export type IProgressCicle = {
    percent?: number | undefined
    radius?: number
    strokeWidth?: number
    duration?: number
    color?: string
    delay?: number
    textColor?: string
    max?: number
    onSubmit?: () => void
    selectedItemCount?: number
    dataTotalCount?: number
}
