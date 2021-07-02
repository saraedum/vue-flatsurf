/* ******************************************************************************
 * Copyright (c) 2021 Julian Rüth <julian.rueth@fsfe.org>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * *****************************************************************************/

import HalfEdge, { HalfEdgeSchema } from "./HalfEdge";
import Vector, { VectorSchema } from "../Vector";
import CoordinateSystem from '../CoordinateSystem';

export interface SaddleConnectionSchema {
  source: HalfEdgeSchema,
  target: HalfEdgeSchema,
  vector: VectorSchema,
  crossings: {
    halfEdge: number,
    at: number,
  }[]
};

export default class SaddleConnection {
  public static parse(yaml: SaddleConnectionSchema, coordinateSystem: CoordinateSystem): SaddleConnection {
    return new SaddleConnection(yaml.source, yaml.target, Vector.parse(yaml.vector, coordinateSystem), yaml.crossings);
  }

  private constructor(source: HalfEdge, target: HalfEdge, vector: Vector, crossings: {halfEdge: HalfEdge, at: number}[]) {
    this.source = source;
    this.target = target;
    this.vector = vector;
    this.crossings = Object.freeze(crossings);
  }

  public readonly source: HalfEdge;
  public readonly target: HalfEdge;
  public readonly vector: Vector;
  // The sequence of half edges crossed with approximate
  // relative point of crossing in [0, 1].
  public readonly crossings: readonly {halfEdge: HalfEdge, at: number}[];
}

