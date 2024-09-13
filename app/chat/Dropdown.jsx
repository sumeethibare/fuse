import { ArrowsRightLeftIcon } from "@heroicons/react/16/solid";

function Dropdown({ chats, onChatClick }) {
  return (
    <div className="dropdown dropdown-end float-right right-0 absolute p-4">
      <div tabIndex={0} role="button" className="btn m-1 rounded-xl">
        <ArrowsRightLeftIcon className="w-4"/>
        Switch Chats
        </div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-xl z-[1] w-52 p-1.5 shadow">
        {chats.map((chat) => (
          <li key={chat.id}>
            <a onClick={() => onChatClick(chat.id)}>{chat.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dropdown;
