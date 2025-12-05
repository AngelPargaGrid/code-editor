import * as Y from 'yjs';


class YjsDocs {
  constructor() {
    this.docs = new Map();
  }

  /**
   * @param {string} docName 
   * @returns {Y.Doc} 
   */
  getYDoc(docName) {
    if (!this.docs.has(docName)) {
      const ydoc = new Y.Doc();
      this.docs.set(docName, ydoc);
    }
    return this.docs.get(docName);
  }

  /**
   * @returns {Array<string>} 
   */
  getAllDocNames() {
    return Array.from(this.docs.keys());
  }

  /**
   * @param {string} docName 
   * @returns {boolean} 
   */
  deleteDoc(docName) {
    return this.docs.delete(docName);
  }

  clearAllDocs() {
    this.docs.clear();
  }

  /**
   * @returns {number} 
   */
  getDocCount() {
    return this.docs.size;
  }
}

export const yjsDocs = new YjsDocs();
