import Tooltip from 'react-bootstrap/Tooltip';

const borrowTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        Click to borrow a book
    </Tooltip>
);
const returnTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        Click to return a book
    </Tooltip>
);
const availableBookTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        Click to assign a book
    </Tooltip>
);
const assignedBookTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        Click to make book available
    </Tooltip>
);
const deleteBookTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        Click to delete book available
    </Tooltip>
);
const editBookTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        Click to edit a book
    </Tooltip>
);

export {
    borrowTooltip,
    returnTooltip,
    availableBookTooltip,
    assignedBookTooltip,
    deleteBookTooltip,
    editBookTooltip
}