import { useState } from "react";
import { useEffect } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

function App() {
    const [items, setItems] = useState(() => {
        try {
            const savedItems = localStorage.getItem("items");
            return savedItems ? JSON.parse(savedItems) : [];
        } catch (error) {
            console.error("Failed to load from localStorage", error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem("items", JSON.stringify(items));
        } catch (error) {
            console.error("Failed to save to localStorage", error);
        }
    }, [items]);

    function handleAddItems(item) {
        setItems((items) => [...items, item]);
    }

    function handleDeleteItem(id) {
        console.log(id);
        setItems((items) => items.filter((item) => item.id !== id));
    }

    function handleToggleItem(id) {
        setItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, packed: !item.packed } : item
            )
        );
    }

    function handleClearItems() {
        const confirmed = window.confirm(
            "Are you sure you want to clear all items?"
        );
        if (confirmed) setItems([]);
    }

    return (
        <div className="app">
            <Logo />
            <Form onAddItems={handleAddItems} />
            <PackingList
                items={items}
                onDeleteItem={handleDeleteItem}
                onToggleItems={handleToggleItem}
                onClearItems={handleClearItems}
            />
            <Stats items={items} />
        </div>
    );
}
export default App;
