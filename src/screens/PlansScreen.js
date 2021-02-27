import React, { useEffect, useState } from "react";
import db, { auth } from "../firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import "./PlansScreen.css";
import { loadStripe } from "@stripe/stripe-js";

function PlansScreen() {
  const [products, setProducts] = useState([]);

  const user = useSelector(selectUser);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapShot) => {
        const products = {};

        querySnapShot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(`An error occured : ${error.message}`);
      }
      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51IOS2ACnNcfjG7cpW3RuXQdjfBQCqqbGZVrz9benh6lt75s0uFWSc9JvvMk4atOxug3zmN7mgTYct5FZnHE3dohE007s3SuOyi"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="plansScreen">
      {Object.entries(products).map(([productId, productData]) => {
        //   logic to check
        return (
          <div key={productId} className="plansScreen__plan">
            <div key={productData.name} className="plansScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button onClick={() => loadCheckout(productData.prices.priceId)}>
              SubsCribe
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
