import { create } from "zustand"

type Task = { id: string; title: string }

type Store = {
  columns: Record<string, Task[]>
  moveTask: (taskId: string, fromId: string, toId: string) => void
}

export const useBoardStore = create<Store>((set) => ({
  columns: {
    todo: [{ id: "t1", title: "Task 1" }],
    doing: [{ id: "t2", title: "Task 2" }],
    done: [],
  },
  moveTask: (taskId, fromId, toId) =>
    set((state) => {
      const task = state.columns[fromId].find((t) => t.id === taskId)
      if (!task) return state

      return {
        columns: {
          ...state.columns,
          [fromId]: state.columns[fromId].filter((t) => t.id !== taskId),
          [toId]: [...state.columns[toId], task],
        },
      }
    }),
}))
