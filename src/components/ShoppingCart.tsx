import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems, cartQuantity } = useShoppingCart();

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        {cartQuantity !== 0 ? (
          <>
            <Stack gap={3}>
              {cartItems.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
              <div className="ms-auto fw-bold fs-5">
                Total:{" "}
                {formatCurrency(
                  cartItems.reduce((total, cartItem) => {
                    const item = storeItems.find(
                      (item) => item.id === cartItem.id
                    );
                    return total + (item?.price || 0) * cartItem.quantity;
                  }, 0)
                )}
              </div>
            </Stack>
          </>
        ) : (
          <span className="text-muted">Nothing in your cart yet !</span>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
