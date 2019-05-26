---
title: "Machine Learning Part 3: Linear Regression"
categories:
  - Tutorial
tags:
  - machine-learning
  - linear-regression
  - cost-function
  - gradient-descent
---
<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>
Here we are again, in the third post of Machine Learning's tutorials. Today I'm gonna tell you about Linear Regression, the most common and understandable learning algorithm. This time I will dig more deeper so that after this post, you will know what actually happened during the learning process. So no more Dogs and Cats today, but algebraic stuff. Yeah, we're gonna work with matrices, from now on. But don't worry, it's not gonna be so hard today.
As I told you before, we got some training data containing Features and Labels. Features are somewhat distinct which can be used to distinguish between things.

![Image_1](/images/tutorials/what-is-machine-learning/5.jpg)

Remember this? To recall a little bit, I called 'X' Features, 'y' Labels, and 'a' Prediction. It may get your attention here, but it's just a naming convention, which X is always in uppercase, and y is lowercase.

So after collecting a great deal of training data (X, y), we have them learned by the computer. Then we show the data which the computer has never seen before, which contains only X this time, and the computer will give us a prediction, called 'a'.

I just helped you to recall about what Machine Learning is. But I think it would be better if you have a further look about Machine Learning on my first post here: [What  is Machine Learning?](https://chunml.github.io/ChunML.github.io/tutorial/Machine-Learning-Definition/){:target="_blank"}

So from the image above, the first thing coming to our minds is, how the computer can compute *y* from *X* during the learning process, and how it can compute prediction *a* from *X*?

Well, we will continue from what we were doing on the first post. The answer to the question above is: we need an learning algorithm. And in order to make an algorithm work, we need something called Activation Function.

### Activation Function

![Image_1](/images/tutorials/what-is-machine-learning/9.jpg)

Here's where we left off in the first post. The reason why I mentioned it to you because you will face the term Activation Function not only in Linear Regression, or Logistic Regression in later post, but also in the more complicated algorithms which you will learn in the future. So, what is Activation Function? That's a function which takes *X* as variable, and we use it to compute the prediction *a*.

In case of Linear Regression, the Activation Function is so simple that it's not considered an Activation Function at all!

$$
\begin{align*}
  h_\theta(X^{(i)})=\theta_0+\sum_{j=1}^m\theta_jX_j^{(i)}=\theta_0+\theta_1X_1^{(i)}+\theta_2X_2^{(i)}+\cdots+\theta_nX_n^{(i)}
\end{align*}
$$

I'll explain the equation above. First, the superscript and the subscript on each *X*, what do they mean? Imagine we have a training dataset which has 10 examples, each example has 4 features, so the superscript will indicate the *ith* example, and the subscript will indicate the *jth* feature. You will be used to this convention soon, so don't worry if you can't get that right now.

For the sake of simplicity, let's consider an example, where we have 10 examples, each example only contains one feature. So the Activation Function will look like this:

$$
\begin{align*}
  h_\theta(X^{(i)})=\theta_0+\theta_1X_1^{(i)}
\end{align*}
$$

Does it look similar to you? Yeah, that's exactly a linear equation with one variable which you learned a lot at high school. If we plot it on the coordinate plane, we will obtain a straight line. That's the idea of Linear Regression.

Imagine our training data look like this:

| X       | y           |
| ------------- |-------------| 
| 1      | 7 | 
| 2      | 8 |
| 3      | 7 |
| 4      | 13 |
| 5      | 16 |
| 6      | 15 |
| 7      | 19 |
| 8      | 23 |
| 9      | 18 |
| 10      | 21 |

If we plot them on the coordinate plane, we will obtain something like this:

![Training_data](/images/tutorials/linear-regression/1.jpg)

So, our mission now, is to find an appropriate function which can best fit those points. In case of Linear Regression with one variable, because the activation function is actually a straight line, so we will have to find a straight line which can almost go through all those points, intuitively.

But, how do we start? Well, we will start by randomizing all the parameters, which means \\( \theta_0,\theta_1 \\). So let's set them both to *1*. Now we can compute *a* by activation function: \\(a=1+x\\). Now if we plot *X*, *y*, and the straight line \\(a=1+x\\), we will have something like this:

![Randomized_function](/images/tutorials/linear-regression/2.jpg)

Obviously, the straight line we obtain from \\(a=1+x\\) doesn't fit our training data well. But that's OK because we just began by randomizing the parameters, and no learning was actually performed. So here comes the next question: how can we improve the activation function so that it can fit the data better? Or I can say it differently: how can we make the computer learn to fit the data? 

Obviously, we must think of some way to evaluate how well the current function is performing. One way to accomplish this task is to compute Cost Function, which takes the difference between the Label and the prediction as its variable. And among many types of Cost Function, I will introduce to you the Mean Squared Error Function, which is the most appropriate approach for Linear Regression, and yet maybe the simplest one for you to understand.

### Mean Squared Error Function

Firstly, let's see what Mean Squared Error Function (MSE) looks like:

$$
\begin{align*}
  J(\theta)=\frac{1}{2m}\sum_{i=1}^m(h_\theta(X^{(i)})-y^{(i)})^2=\frac{1}{2m}\sum_{i=1}^m(a^{(i)}-y^{(i)})^2
\end{align*}
$$

Now everything has just become clear. It computes the mean value of the squared errors, which are the differences between the  Prediction \\( h_\theta(X^{(i)}) \\) and the Label \\( y^{(i)} \\). You can see that if the value of \\( J(\theta) \\) is large, it means that the difference between the Prediction and the Label is also large, which causes the straight line can not fit the training data well. In contrast, if the value of \\( J(\theta) \\) is close to zero, it means that the Prediction and the Label lie very closely in the coordinate plane, which we can tell that the straight line obtained from the activation function fits the training data pretty well.

Here you may have a question: why don't we just take mean value of the difference between Prediction and Label? Why must we use the squared value instead? Well, there's no "must" here. In this case the squared error works just fine, so it was chosen. There's no problem if we just use the difference instead. But let's consider this case. Imagine you have \\( a^{(1)}=2 \\), \\( y^{(1)}=4 \\) and \\( a^{(2)}=5 \\), \\( y^{(1)}=3 \\). What will happen in both cases?

No squared error:
$$J(\theta) = \frac{1}{2*2}((2-4)+(5-3)) = \frac{1}{2*2}(-2+2) = 0$$

With squared error:
$$J(\theta) = \frac{1}{2*2}((2-4)^2+(5-3)^2) = \frac{1}{2*2}(4+4) = 2$$

As you can see, the MSE will accumulate the error without caring the sign of the error, whereas the Mean Error is likely to omit the error like the example above. Of course, in another place, using the Mean Error instead of MSE will somehow make some sense, but that's beyond the scope of this post, so I'll talk about it when I have chance.

So, through MSE value, we can somehow evaluate how well the activation function is performing, or how well the straight line obtained by the same function is fitting our training data. Then what will we do in the next step? We'll come to a new concept called, Gradien Descent. Keep going, you're half way there!

### Gradient Descent
Before digging deeper into Gradient Descent. Let's look back our MSE function:

$$J(\theta)=\frac{1}{2m}\sum_{i=1}^m(h_\theta(X^{(i)})-y^{(i)})^2=\frac{1}{2m}\sum_{i=1}^m(a^{(i)}-y^{(i)})^2$$

Note that our cost function takes \\( \theta \\) as its variable, not \\( X^{(i)} \\). For the sake of simplicity, let's say \\( \theta \\) contains only \\( \theta_1 \\). Then our cost function will look like below:

$$J(\theta)=\frac{1}{2m}[(\theta_1X_1^{(1)}-y^{(1)})^2+(\theta_1X_1^{(2)}-y^{(2)})^2+\dots]=A\theta_1^2+B\theta_1+C$$

As you can see, our cost function now becomes a quadratic function with \\( \theta_1 \\) variable. Let's take one more step, when we plot a quadratic function, we will obtain some figure like this:

![Quadratic function](/images/tutorials/linear-regression/3.jpg)

A picture's worth a thousands word, right? Our learning objective is to find the parameter \\( \theta \\) so that we can draw a straight line which can almost go through all the points in the coordinate plane. In order to accomplish that, we compute a Cost Function (in this case we use the MSE function). We want the value of the Cost Function to be as small as possible.  

As we can see in the figure above, our Cost Function is now a quadratic function \\( A\theta^2+B\theta+C \\). Because we have \\( A>0 \\), so that our Cost Function is a [convex function](https://en.wikipedia.org/wiki/Convex_function){:target="_blank"}. You can think of a convex function as some function which has one or many minima. In the case of quadratic function with one variable, our Cost Function only has one minimum. Obviously, all we have to do now, is to find that minimum's value. But how will we do that? Let's consider the next figure:

![Gradien Descent](/images/tutorials/linear-regression/4.jpg)

You may remember that earlier in this post, we started by randomize the parameter \\( \theta \\). So with that randomized value, let's say some value which is far from the minimum. How is it supposed to go down to the minimum? Oops, you already got it right. It just simply goes down, step by step. But mathematically, how can we force it to go down?

Look at the first arrow to the right a little bit. You may find it very familiar, there's something that is equal to the slope of the tangent line of the Cost Function of the starting point. I'll help you this time: that is Derivatives. To be more exact, when \\( J(\theta) \\) is the function of multiple variables, instead of saying Derivatives, we will use the term: Gradient. Gradient is actually a vector whose elements are Partial Derivatives. Find it hard to understand?

* Derivative (one-variable function):  
$$\frac{\mathrm d}{\mathrm d\theta}J(\theta)$$

* Gradient (multiple-variable function):  
$$\nabla J(\theta)=\begin{bmatrix}\frac{\partial}{\partial \theta_1}J(\theta)\\\frac{\partial}{\partial \theta_2}J(\theta)\\\vdots\\\frac{\partial}{\partial \theta_n}J(\theta)\\\end{bmatrix}$$

I think I'm not going any further in explaining what is behind the Gradient. You can just think of it as a way to tell the computer: which direction to move its next step from the current point. With the right direction, it will gradually make it closer and closer to the minimum, and when it's finally there, we will have our Cost Function reach its minimum value, and as a result, we will have our final Activation Function which can best fit our training data.

So now you might understand how exactly the learning process occurs. Here comes the final step: how does the computer update the parameters to move towards the next point on the Cost Function \\( J(\theta) \\) graph?

### Parameter Update
With the Gradient \\( \nabla J(\theta) \\) obtained above, we will perform update on the parameters like below:

$$\theta=\theta-\alpha\nabla J(\theta)$$

Note that bote \\( \theta \\) and \\( \nabla J(\theta) \\) are vectors, so I can re-write the equation above like this:

$$\begin{bmatrix}\theta_0\\\theta_1\\\vdots\\\theta_n\end{bmatrix}=\begin{bmatrix}\theta_0\\\theta_1\\\vdots\\\theta_n\end{bmatrix}-\alpha\begin{bmatrix}\frac{\partial}{\partial\theta_0}J(\theta)\\\frac{\partial}{\partial\theta_1}J(\theta)\\\vdots\\\frac{\partial}{\partial\theta_n}J(\theta)\end{bmatrix}$$

You may see the newcomer \\( \alpha \\). It's called *learning rate*, which indicates how fast the parameters are updated at each step. Simply, if we set \\( \alpha \\) to be large, then it's likely to go down faster, and reach the desired minimum faster, and vice versa, if \\( \alpha \\) is too small, then it will take more time until it reach the minimum. So you may ask, why don't we just make \\( \alpha \\) large? Well, learning with large *learning rate* is always risky. Consider the figure below:

![Unreachable minumum](/images/tutorials/linear-regression/5.jpg)

As you might see, if we set our *learning rate* too large, then it will behave unexpectedly, and likely never reach the minimum. So my advice is, try to set \\( \alpha \\) to be small at first (but not too small), then see whether it worked or not. Then you can think about increasing \\( \alpha \\) gradually to improve the performance.

After you know what the learning rate \\( \alpha \\) is. The last question (I hope) you may ask is: how do we compute the Gradient? That's pretty easy, since our MSE function is just a quadratic function. You can compute the Partial Derivatives using the [Chain Rule](https://en.wikipedia.org/wiki/Chain_rule){:target="_blank"}. It may take some time to compute, so I show you the result right below. You can confirm it yourselves afterwards.

* For weights (\\( \theta_1, \ldots, \theta_n\\))

$$\frac{\partial}{\partial \theta_j}J(\theta) = \frac{1}{m}\sum_{i=1}^m(h_\theta^{(i)}(x^{(i)})-y^{(i)}).x_j^{(i)}$$

There's one more thing I want remind you: Weights and Bias. As I said in the first post, Weights are parameters which associate with X, and Bias is parameter which stands alone. So I show you above how to update the Weights. What about the Bias? Because Bias doesn't associate with X, so its Partial Derivative doesn't, either.

* For bias (\\( \theta_0 \\))

$$\frac{\partial}{\partial \theta_0}J(\theta) = \frac{1}{m}\sum_{i=1}^m(h_\theta^{(i)}(x^{(i)})-y^{(i)})$$

Until this point, you may understand why we use \\( \frac{1}{2m} \\) instead of \\( \frac{1}{m} \\) in the MSE function. Because it's a quadratic function, using \\( \frac{1}{2m} \\) will make it easier for computing Partial Derivative. Everything happens for some reason, right?

Now let's put things together. Here's what we have:

$$\begin{bmatrix}\theta_0\\\theta_1\\\vdots\\\theta_n\end{bmatrix}=\begin{bmatrix}\theta_0\\\theta_1\\\vdots\\\theta_n\end{bmatrix}-\frac{\alpha}{m}\begin{bmatrix}\sum_{i=1}^m(h_\theta^{(i)}(x^{(i)})-y^{(i)})\\\sum_{i=1}^m(h_\theta^{(i)}(x^{(i)})-y^{(i)}).x_1^{(i)}\\\vdots\\\sum_{i=1}^m(h_\theta^{(i)}(x^{(i)})-y^{(i)}).x_n^{(i)}\end{bmatrix}$$

Seems like a mess, huh? The best way to understand something is doing something with it. Now let's solve the problem above, we will try to make the straight line to fit our training points.

1. Parameters Initialization:  
As above, we initialized \\(\theta_0=1\\), \\(\theta_1=1\\). We will compute our Cost Function \\( J(\theta) \\).

$$J(\theta) = \frac{1}{2*10}\sum_{i=1}^{10}(X^{(i)} + 1 - y^{(i)})^2=38.34$$

At starting point, our Cost Function's value is unacceptably large. So we have to update our parameters using Gradient Descent. Let's do it now.

Let's set the learning rate \\( \alpha=0.03 \\), here's the new parameters after we performed the update:

$$\theta_0 = \theta_0 - \frac{\alpha}{10}\sum_{i=1}^m(X^{(i)} + 1 - y^{(i)})=1.25$$
$$\theta_1 = \theta_1 - \frac{\alpha}{10}\sum_{i=1}^m(X^{(i)} + 1 - y^{(i)}).X^{(i)}=2.55$$

With the new parameters, let's re-compute the Cost Function:

$$J(\theta) = \frac{1}{2*10}\sum_{i=1}^{10}(2.55*X^{(i)} + 1.25 - y^{(i)})^2=4.89$$

You can see that our Cost Function's value has dropped significantly after just one update step. Let's plot our new Activation Function to see how well it improved:

![Update 1](/images/tutorials/linear-regression/6.jpg)

Eh, there's still much room for improvement. Doing similarly until the forth step, here's what we got:

$$\theta_0 = 1.28$$  
$$\theta_1 = 2.30$$  
$$J(\theta) = 3.72$$  

Let's plot it onto the coordinate plane:

![Update 4](/images/tutorials/linear-regression/7.jpg)

As you can see, we now have our straight line which can fit our training data fairly well. And if we run the update few more rounds, you may see that our Cost Function still keeps decreasing but with just slight changes. And we can barely visualize the improvement in the graph. Obviously, we just can't ask for more in case of a straight line. And since this is the simplest algorithm that I used to explain the learning process, I hope you can now understand what is actually "behind the scenes" and visualize the learning process.

In the next post, I'll continue with the second part on Linear Regression. I'll show you how we can improve the performance of Linear Regression, and we will, finally, using Python's powerful libraries to help us complete the implementation.

That's it for today. Drop me a line if you have any question. See you in the next post!
