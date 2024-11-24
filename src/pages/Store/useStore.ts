import {create} from 'zustand';

interface Aragorn2State {
    show: boolean
    setShow: (show: boolean) => void
}

const useStore = create<Aragorn2State>((set: any) => ({
    show: false,
    setShow: (show: unknown) => set({show}),
}))

export default useStore