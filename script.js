.proc-toggle {
  all: unset;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--sp-sm) var(--sp-md);
  font-weight: 600;
  background: var(--clr-secondary);
  color: var(--clr-light);
  border-radius: 6px;
  cursor: pointer;
  transition: background var(--transition), transform var(--transition);
  position: relative;
}
.proc-toggle:hover {
  background: var(--clr-primary);
  transform: translateY(-1px);
}
.proc-toggle:focus-visible {
  outline: 3px solid var(--clr-light);
  outline-offset: 2px;
}
.proc-toggle::after {
  content: "▾";
  font-size: 1rem;
  margin-left: auto;
  transition: transform 0.25s;
}